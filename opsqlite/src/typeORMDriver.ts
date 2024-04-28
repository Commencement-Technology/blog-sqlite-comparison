import type {
  OPSQLiteConnection,
  QueryResult,
  Transaction,
} from '@op-engineering/op-sqlite';
import {open} from '@op-engineering/op-sqlite';

const enhanceQueryResult = (result: QueryResult): void => {
  if (result.rows == null) {
    result.rows = {
      _array: [],
      item: (index: number) => result.rows?._array[index],
      length: 0,
    };
  } else {
    result.rows.item = (index: number) => result.rows?._array[index];
  }
};

export const typeORMDriver = {
  openDatabase: (
    options: {
      location?: string;
      name: string;
    },
    ok: (database: OPSQLiteConnection) => void,
    fail: (message: string) => void,
  ) => {
    try {
      const database = open({location: options.location, name: options.name});

      const connection = {
        attach: (
          databaseNameToAttach: string,
          alias: string,
          location: string | undefined,
          callback: () => void,
        ) => {
          database.attach(databaseNameToAttach, alias, location);

          callback();
        },
        close: (ok: () => void, fail: (argument0: unknown) => void) => {
          try {
            database.close();
            ok();
          } catch (error) {
            fail(error);
          }
        },
        detach: (alias: string, callback: () => void) => {
          database.detach(alias);

          callback();
        },
        executeSql: async (
          sql: string,
          parameters: unknown[] | undefined,
          ok: (response: QueryResult) => void,
          fail: (message: string) => void,
        ) => {
          try {
            const response = await database.executeAsync(sql, parameters);

            enhanceQueryResult(response);
            ok(response);
          } catch (error) {
            fail(error as unknown as string);
          }
        },
        transaction: (
          function_: (tx: Transaction) => Promise<void>,
        ): Promise<void> => database.transaction(function_),
      };

      ok(connection as unknown as OPSQLiteConnection);

      return connection;
    } catch (error) {
      fail(error as unknown as string);
    }
  },
};
