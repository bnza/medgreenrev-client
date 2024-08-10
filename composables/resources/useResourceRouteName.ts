export default function useResourceRouteName(
  routeName: string,
  parent?: Record<string, any>,
) {
  const route = useRoute()
  if (!routeName && route.name) {
    routeName =
      typeof route.name === 'symbol' ? route.name.description : route.name
  }
  //@ts-ignore
  parent =
    parent && Object.keys(parent).length > 0 ? parent : route.query?.parent
  if (parent) {
    routeName += `/${Object.keys(parent)[0]}`
  }

  return { routeName }
}
