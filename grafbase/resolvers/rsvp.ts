export default async function RSVPResolver(_, { input }) {
  const { name, status } = input;

  // ... await "custom business logic"

  return {
    name,
    status,
  };
}
