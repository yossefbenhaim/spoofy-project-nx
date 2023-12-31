import { gql } from '@apollo/client';

const GET_SONGS = gql`
  query allSongs {
    allSongs(orderBy: CREATED_SONG_ASC) {
      nodes {
        id
        name
        duration
        artistByArtistId {
          name
        }
      }
    }
  }
`;

export default GET_SONGS;
