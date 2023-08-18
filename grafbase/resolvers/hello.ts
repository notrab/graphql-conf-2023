export default function HelloResolver(_, { name }) {
	return name || "world";
}
