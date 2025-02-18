export default await Promise.all(
  (
    await Promise.all(
      await Promise.all(
        //
        [import("./converters/test")]
        //
      )
    )
  ).map((item) => item.default())
);
