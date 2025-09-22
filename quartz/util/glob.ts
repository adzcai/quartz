import path from "path"
import { FilePath } from "./path"
import { globby, globbySync } from "globby"

export function toPosixPath(fp: string): string {
  return fp.split(path.sep).join("/")
}

export async function glob(
  pattern: string,
  cwd: string,
  ignorePatterns: string[],
): Promise<FilePath[]> {
  const fps = (
    await globby(pattern, {
      cwd,
      ignore: ignorePatterns,
      gitignore: true,
    })
  ).map(toPosixPath)
  return fps as FilePath[]
}

export function globFileSync(name: string, cwd: string) {
  const fps = globbySync(`**/${name}`, { cwd }).map(toPosixPath)
  return fps as FilePath[]
}