/* eslint-disable import/prefer-default-export */
import { LocalstorageName } from "types/auth"

export const removeItems = (args: LocalstorageName[] = []): void =>
  args.forEach((arg: LocalstorageName) => localStorage.removeItem(arg))
