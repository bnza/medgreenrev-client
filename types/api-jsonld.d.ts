interface JsonLdItem extends Record<string, any> {
  '@id': string
  '@type': string
}

interface JsonLdDocument extends JsonLdItem {
  '@context': string | Record<string, string>
}

interface JsonLdContext extends Record<string, string> {
  '@vocab': string
}

interface HydraProperty extends JsonLdItem {
  'rdfs:label': string
  domain: string
  range: string
}

interface HydraSupportedProperty extends JsonLdItem {
  '@type': 'hydra:SupportedProperty'
  'hydra:property': HydraProperty
  'hydra:title': string
  'hydra:required': boolean
  'hydra:readable': boolean
  'hydra:writable': boolean
}

interface HydraSupportedOperation extends JsonLdItem {
  '@type': string | Array<string>
  'hydra:method': 'GET' | 'DELETE' | 'POST' | 'PUT' | 'PATCH' | 'OPTIONS'
  'hydra:title': string
  'rdfs:label': string
  returns: string
}

interface HydraSupportedClass extends JsonLdItem {
  'hydra:title': string
  'rdfs:label': string
  'hydra:SupportedProperty': Array<HydraSupportedProperty>
  'hydra:SupportedOperation': Array<HydraSupportedOperation>
}

interface JsonLdApiDocumentation extends JsonLdDocument, JsonLdContext {
  'hydra:title': string
  'hydra:entrypoint': string
  'hydra:supportedClass': Array<HydraSupportedClass>
}

export interface JsonLdResourceItem<T extends Record<string, any>>
  extends JsonLdItem,
    T {}

interface JsonLdResourceCollection<T extends Record<string, any>>
  extends JsonLdDocument {
  'hydra:totalItems': number
  'hydra:member': Array<JsonLdResourceItem<T>>
}
