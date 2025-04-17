export interface Rating {
  Source: string
  Value: string
}

export interface Movie {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Poster: string
  Ratings: Rating[]
  Metascore: string
  imdbRating: string
  imdbID: string
}

export interface SavedMovie {
  id: string
  title: string
  year: string
  poster: string
  imdbID: string
}

type MovieType = Movie | SavedMovie

export function isSavedMovie(movie: MovieType): movie is SavedMovie {
  return 'id' in movie
}

export function isMovie(movie: MovieType): movie is Movie {
  return 'Title' in movie
}
