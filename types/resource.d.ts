export {}

declare global {
  interface ApiResourceItem<T extends number|string> {
    id: T
  }

  interface LdApiResourceItem<RT extends ApiResourceItem<RT['id']>> extends RT{
    '@context': string
    '@id': string
    '@type': string
  }
}