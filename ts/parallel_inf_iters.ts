/** merge multiple infinite async iterators and run them concurrently */

const asyncGen = (name: string, num: number) =>
  async function* () {
    while (true) {
      await new Promise((resolve) => setTimeout(resolve, 1000 * num))
      yield `${name}: ${Math.random()}`
    }
  }

async function consumeAsyncIterator(asyncIterator: AsyncIterableIterator<string>) {
  for await (const value of asyncIterator) {
    console.log(value)
  }
}

async function runInParallel() {
  const iterators = [1, 2, 4, 8].map((i) => asyncGen(`gen ${i}`, i)())
  const promises = iterators.map(consumeAsyncIterator)

  await Promise.all(promises)
}

await runInParallel()

