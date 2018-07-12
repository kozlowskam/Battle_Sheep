import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  Index,
  OneToMany,
  ManyToOne
} from "typeorm";
import User from "../users/entity";
import { createEmptyBoard } from "./logic";

type Status = "pending" | "started" | "finished";
//import User from "../users/entity";
export type Board = string[][];

@Entity("games")
export class Game extends BaseEntity {
  @PrimaryGeneratedColumn() id?: number;

  @Column("json", { nullable: true })
  board: Board;

  @Column("text", { default: "pending" })
  status: Status;

  @OneToMany(_ => Player, player => player.game, { eager: true })
  players: Player[];
}

@Entity()
@Index(["game", "user"], { unique: true })
export class Player extends BaseEntity {
  @PrimaryGeneratedColumn() id?: number;

  @ManyToOne(_ => User, user => user.players)
  user: User;

  @ManyToOne(_ => Game, game => game.players)
  game: Game;

  @Column() userId?: number;
}
