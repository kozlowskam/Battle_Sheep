import {
  JsonController,
  Authorized,
  CurrentUser,
  Post,
  Put,
  Param,
  BadRequestError,
  HttpCode,
  NotFoundError,
  ForbiddenError,
  Get,
  Body,
  Patch
} from "routing-controllers";
import User from "../users/entity";
import { Game, Player, Board } from "./entities";
import { Validate } from "class-validator";
import { io } from "../index";
import { createRandomBoard, placeSheep, sheepShapes, shotHits } from "./logic";

class GameUpdate {
  board: Board;
}

class BoardUpdate {
  board: Board;
}

@JsonController()
export default class GameController {
  @Authorized()
  @Post("/games")
  @HttpCode(201)
  async createGame(@CurrentUser() user: User) {
    const entity = await Game.create({ board: createRandomBoard() }).save();

    await Player.create({
      game: entity,
      user
    }).save();
    const game = await Game.findOneById(entity.id);

    io.emit("action", {
      type: "ADD_GAME",
      payload: game
    });

    return game;
  }

  @Authorized()
  @Post("/games/:id([0-9]+)/players")
  @HttpCode(201)
  async joinGame(@CurrentUser() user: User, @Param("id") gameId: number) {
    const game = await Game.findOneById(gameId);
    if (!game) throw new BadRequestError(`Game does not exist`);
    if (game.status !== "pending")
      throw new BadRequestError(`Game is already started`);

    game.status = "started";
    await game.save();

    const player = await Player.create({
      game,
      user
    }).save();

    io.emit("action", {
      type: "UPDATE_GAME",
      payload: await Game.findOneById(game.id)
    });

    return player;
  }

  @Authorized()
  // the reason that we're using patch here is because this request is not idempotent
  // http://restcookbook.com/HTTP%20Methods/idempotency/
  // try to fire the same requests twice, see what happens
  @Patch("/games/:id([0-9]+)")
  async updateGame(
    @CurrentUser() user: User,
    @Param("id") gameId: number,
    @Body() update: GameUpdate
  ) {
    console.log(update, "consolelog update");

    const game = await Game.findOneById(gameId);
    if (!game) throw new NotFoundError(`Game does not exist`);

    const player = await Player.findOne({ user, game });

    if (!player) throw new ForbiddenError(`You are not part of this game`);
    if (game.status !== "started")
      throw new BadRequestError(`The game is not started yet`);

    game.board = shotHits(game.board, []);
    Game.merge(game, update);

    game.board = update.board;
    await game.save();

    io.emit("action", {
      type: "UPDATE_GAME",
      payload: game
    });

    return game;
  }

  /*@Put("/games/:id([0-9]+)")
  async updateBoard(
    @CurrentUser() user: User,
    @Param("id") gameId: number,
    @Body() update: BoardUpdate
  ) { 
    const game = await Game.findOneById(gameId);
    game.board = shotHits(game.board, []);
    Game.merge(game, update);
    game.save();
    return game;
  }*/

  @Authorized()
  @Get("/games/:id([0-9]+)")
  getGame(@Param("id") id: number) {
    return Game.findOneById(id);
  }

  @Authorized()
  @Get("/games")
  getGames() {
    return Game.find();
  }

  /*@Post("/games")
  @HttpCode(201)
  async createGame(@Body() game: { board: Board }) {
    game.board = createRandomBoard();
    return game;
  }*/

  /*@Put("/games/:id([0-9]+)")
  async async updateGame(
    @CurrentUser() user: User,
    @Param("id") gameId: number,
    @Body() update: GameUpdate
  ) { 
    let game = await Game.findOne(id);
    game.board = shotHits(game.board, []);
    Game.merge(game, update);
    game.save();
    return game;
  }

  /* @Put("/games/:id")
  async updateGame(@Param("id") id: number, @Body() update: Partial<Game>) {
    const game = await Game.findOne({ id: id });
    if (!game) throw new NotFoundError("game not found");
    game.board = shotHits(game.board, [0, 2]);
    return Game.merge(game, update).save();
  }*/

  /*@Put("/games/:id")
  async updateGame(@Param("id") id: number, @Body() update: { board: Board }) {
    let game = await Game.findOne({ id: id });
    if (!game) throw new NotFoundError("Game not found!");
    game.board = placeSheep(game.board, sheepShapes["fatSheep"], [0, 0]);
    Game.merge(game, update);
    game.save();
    return game;
  }*/
}
