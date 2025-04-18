export interface Rating {
  Source: string
  Value: string
}

export interface OmdbMovie {
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
  imdbId: string
}

type RenameKeys<T> = {
  [P in keyof T as `${Uncapitalize<string & P>}`]: T[P]
}

export type SavedMovie = RenameKeys<OmdbMovie>

type MovieType = OmdbMovie | SavedMovie

export function isSavedMovie(movie: MovieType): movie is SavedMovie {
  return 'title' in movie
}

export function isOmdbMovie(movie: MovieType): movie is OmdbMovie {
  return 'Title' in movie
}

export function convertMovieToSavedMovie(movie: OmdbMovie): SavedMovie {
  return {
    title: movie.Title,
    year: movie.Year,
    poster: movie.Poster,
    imdbID: movie.imdbID,
    imdbId: movie.imdbID,
    rated: movie.Rated,
    released: movie.Released,
    runtime: movie.Runtime,
    genre: movie.Genre,
    director: movie.Director,
    writer: movie.Writer,
    actors: movie.Actors,
    plot: movie.Plot,
    language: movie.Language,
    country: movie.Country,
    awards: movie.Awards,
    ratings: movie.Ratings,
    metascore: movie.Metascore,
    imdbRating: movie.imdbRating,
  }
}
