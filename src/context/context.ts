import { DefaultContext, DefaultState, ParameterizedContext } from 'koa'
import { Database } from '../database'

export type State = DefaultState

export type Context = {
  database: Database
} & DefaultContext

export type KoaContext = ParameterizedContext<State, Context>
