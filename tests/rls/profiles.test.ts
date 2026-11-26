/**
 * @jest-environment node
 */
import type { Client } from 'pg';

import { as, connect, createUser, describeDb, errorCode } from './db';

// 42501 = insufficient privilege / RLS violation
const DENIED = '42501';

let db: Client;
let alice: string;
let bob: string;

beforeAll(async () => {
  if (!process.env.SUPABASE_DB_URL) return;
  db = await connect();
  await db.query('begin');
  alice = await createUser(db, 'Alice');
  bob = await createUser(db, 'Bob');
  await db.query('commit');
});

afterAll(async () => {
  if (!db) return;
  await db.query('delete from auth.users where id = any($1)', [[alice, bob]]);
  await db.end();
});

describeDb('MLK-MOB-002 RLS keeps every profile private to its owner', () => {
  it('has row level security on every table in the public schema', async () => {
    const { rows } = await db.query(
      `select tablename from pg_tables where schemaname = 'public' and not rowsecurity`,
    );
    expect(rows).toEqual([]);
  });

  it('creates a profile with the sign-up name', async () => {
    const { rows } = await db.query('select name from public.profiles where id = $1', [alice]);
    expect(rows).toEqual([{ name: 'Alice' }]);
  });

  it('lets a user read only their own profile', async () => {
    const rows = await as(db, alice, async () => (await db.query('select id from public.profiles')).rows);
    expect(rows).toEqual([{ id: alice }]);
  });

  it('lets a user update their own profile', async () => {
    const count = await as(db, alice, async () =>
      (await db.query(`update public.profiles set name = 'A.' where id = $1`, [alice])).rowCount,
    );
    expect(count).toBe(1);
  });

  it("does not let a user change someone else's profile", async () => {
    const count = await as(db, alice, async () =>
      (await db.query(`update public.profiles set progress = '{"xp": 999999}' where id = $1`, [bob])).rowCount,
    );
    expect(count).toBe(0);
  });

  it('does not let a user create a profile for another id', async () => {
    const code = await as(db, alice, () =>
      errorCode(db.query(`insert into public.profiles (id, name) values (gen_random_uuid(), 'Mallory')`)),
    );
    expect(code).toBe(DENIED);
  });

  it('does not let a user delete profiles directly', async () => {
    const code = await as(db, alice, () => errorCode(db.query('delete from public.profiles where id = $1', [alice])));
    expect(code).toBe(DENIED);
  });

  it('gives signed-out (anon) clients no access at all', async () => {
    const code = await as(db, null, () => errorCode(db.query('select id from public.profiles')));
    expect(code).toBe(DENIED);
  });
});

describeDb('MLK-MOB-003 account deletion only removes the caller', () => {
  it('cannot be called while signed out', async () => {
    const code = await as(db, null, () => errorCode(db.query('select public.delete_my_account()')));
    expect(code).toBe(DENIED);
  });

  it("deletes the caller's account and profile, and nobody else's", async () => {
    const remaining = await as(db, alice, async () => {
      await db.query('select public.delete_my_account()');
      await db.query('reset role');
      return (await db.query('select id from auth.users where id = any($1)', [[alice, bob]])).rows;
    });
    expect(remaining).toEqual([{ id: bob }]);
  });
});
