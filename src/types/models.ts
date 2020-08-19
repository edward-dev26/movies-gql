export interface IMovie<D = {}> {
    id: string | number
    name: string
    genre: string
    rate: number
    watched: boolean
    director: D
}

export interface IDirector<M = {}> {
    id: string | number
    name: string
    age: number
    movies: Array<M>
}