import { Box, Col, Row, Separator, Serif, Spacer } from "@artsy/palette"
import { SearchApp_viewer } from "__generated__/SearchApp_viewer.graphql"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { NavigationTabsFragmentContainer as NavigationTabs } from "Apps/Search/Components/NavigationTabs"
import { SearchMeta } from "Apps/Search/Components/SearchMeta"
import { withSystemContext } from "Artsy"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"

import { Footer } from "Components/v2/Footer"
import { RecentlyViewedQueryRenderer as RecentlyViewed } from "Components/v2/RecentlyViewed"

import { RouterState, withRouter } from "found"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { TrackingProp } from "react-tracking"
import { get } from "Utils/get"
import { ZeroState } from "./Components/ZeroState"

export interface Props extends RouterState {
  viewer: SearchApp_viewer
  tracking: TrackingProp
}

const TotalResults: React.SFC<{ count: number; term: string }> = ({
  count,
  term,
}) => (
  <Serif size="5">
    {count.toLocaleString()} Result{count > 1 ? "s" : ""} for "{term}"
  </Serif>
)

@track({
  context_page: Schema.PageName.SearchPage,
})
export class SearchApp extends React.Component<Props> {
  renderResults(count: number, artworkCount: number) {
    const {
      viewer,
      match: { location },
    } = this.props
    const { searchConnection } = viewer
    const {
      query: { term },
    } = location

    return (
      <>
        <Spacer mb={4} />
        <Row>
          <Col>
            <TotalResults count={count} term={term} />
            <Spacer mb={4} />
            <span id="jumpto--searchResultTabs" />
            <NavigationTabs
              artworkCount={artworkCount}
              term={term}
              searchableConnection={searchConnection}
            />
            <Box minHeight="30vh">{this.props.children}</Box>
          </Col>
        </Row>

        {this.renderFooter()}
      </>
    )
  }

  renderFooter() {
    return (
      <>
        <Row>
          <Col>
            <RecentlyViewed />
          </Col>
        </Row>

        <Separator mt={6} mb={3} />

        <Row>
          <Col>
            <Footer />
          </Col>
        </Row>
      </>
    )
  }

  render() {
    const {
      viewer,
      match: { location },
    } = this.props
    const { searchConnection, artworksConnection } = viewer
    const { query } = location
    const { term } = query

    const { aggregations } = searchConnection
    const artworkCount = get(artworksConnection, f => f.counts.total, 0)

    let countWithoutArtworks: number = 0
    const typeAggregation = aggregations.find(agg => agg.slice === "TYPE")
      .counts

    typeAggregation.forEach(({ count, name }) => {
      if (name !== "artwork") {
        countWithoutArtworks += count
      }
    })

    const hasResults = !!(countWithoutArtworks || artworkCount)

    return (
      <AppContainer>
        <HorizontalPadding>
          {/* NOTE: react-head automatically moves these tags to the <head> element */}
          <SearchMeta term={term} />
          {hasResults ? (
            this.renderResults(
              countWithoutArtworks + artworkCount,
              artworkCount
            )
          ) : (
            <Box mt={3}>
              <ZeroState term={term} />
              {this.renderFooter()}
            </Box>
          )}
          <Spacer mb={3} />
        </HorizontalPadding>
      </AppContainer>
    )
  }
}

export const SearchAppFragmentContainer = createFragmentContainer(
  withSystemContext(withRouter(SearchApp)),
  {
    viewer: graphql`
      fragment SearchApp_viewer on Viewer
        @argumentDefinitions(term: { type: "String!", defaultValue: "" }) {
        searchConnection(query: $term, first: 1, aggregations: [TYPE]) {
          aggregations {
            slice
            counts {
              count
              name
            }
          }
          ...NavigationTabs_searchableConnection
          edges {
            node {
              ... on SearchableItem {
                slug
                displayLabel
                displayType
              }
            }
          }
        }
        artworksConnection(keyword: $term, size: 0, aggregations: [TOTAL]) {
          counts {
            total
          }
        }
      }
    `,
  }
)
