import { SimpleFacetValueFragment } from '../gql/generated'

export function useBrandFacetValues(facetValues: SimpleFacetValueFragment[]) {
  return facetValues.filter((sfv) => sfv.facet.code === 'brand')
}

export function useBadgeTopFacetValues(facetValues: SimpleFacetValueFragment[]) {
  return facetValues.filter((sfv) => sfv.facet.code === 'badge-top')
}

export function useBadgeBottomFacetValues(facetValues: SimpleFacetValueFragment[]) {
  return facetValues.filter((sfv) => sfv.facet.code === 'badge-bottom')
}