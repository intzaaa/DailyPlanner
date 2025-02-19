export const execute_defaults = async (
  ...imports: Promise<{
    default: () => Promise<any>;
  }>[]
) =>
  await Promise.all(
    (await Promise.all(await Promise.all(imports))).map((item) =>
      item.default()
    ),
  );
