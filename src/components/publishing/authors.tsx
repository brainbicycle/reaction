import * as React from "react"
import styled from "styled-components"
import Author from "./author"

interface AuthorsProps {
  authors: Array<object>
}

const Authors: React.SFC<AuthorsProps> = props => {
  const { authors } = props
  return (
    <AuthorsContainer>
      {authors.map(author => <Author author={author} />)}
    </AuthorsContainer>
  )
}
const AuthorsContainer = styled.div`
  display: flex;
  flex-direction: column;
`
export default Authors
