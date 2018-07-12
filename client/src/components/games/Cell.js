import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import cellButton from "./cellButton.css";
import { updateGame } from "../../actions/games";
import { connect } from "react-redux";

const request = require("superagent");

class Cell extends PureComponent {
  constructor(props) {
    super(props);
  }

  cellColors = {
    unexplored: (10, 245, 22),
    exploredEmpty: (255, 8, 82),
    exploredOccupied: (255, 255, 255)
  };

  shotHits(board, shotOnCell) {
    // set the cell.discovered on which the shot was fired to True,
    // returns true if the cell was occupied else returns false
    // takes the playing board and targeted cell as arguments
    const { game, updateGame } = this.props;
    const cell = this.props.parentBoard[shotOnCell[0]][shotOnCell[1]];
    cell.discovered = true;
    if (cell.occupied === true) {
      console.log("you shot!");
      // this.props.uiBoard[this.props.position[0]][
      //   this.props.position[1]
      // ].style.backgroundColor =
      //   "red";
      // <img src={require("./sheep.png")} className="sheepImage" />;
      cell.discovered = true;
      return true;
    } else {
      console.log("shot misses!");

      // return board;
    }
  }

  updateCell = cell => {
    if (
      this.props.parentBoard[cell.props.position[0]][cell.props.position[1]]
        .occupied &&
      this.props.parentBoard[this.props.position[0]][this.props.position[1]]
        .discovered
    ) {
      {
      }
    }
  };

  showSheep() {
    if (
      this.props.parentBoard[this.props.position[0]][this.props.position[1]]
        .occupied
    ) {
      console.log(" dsfsfsdf");
      return (
        <img
          src={require("./sheep1_icon.png")}
          className="sheepImage"
          style={{ display: "inline-block" }}
        />
      );
    }
  }

  onCellClick = () => {
    console.log(this.props, "Log made in line 13 cell.js");

    this.shotHits(this.props.parentBoard, this.props.position);
    //request.patch("http://localhost:3000/games/:id").send({});
    this.props.parentBoard;
    this.showSheep;
    return this.props.cellPosition;
  };

  render() {
    return (
      <div style={{ display: "inline-block" }}>
        <button className="cellButton" onClick={this.onCellClick} />
        {this.showSheep()}
      </div>
    );
  }
}
const mapStateToProps = (state, props) => ({
  game: state.games,
  users: state.users
});

const mapDispatchToProps = {
  updateGame
};

export default connect(mapStateToProps, mapDispatchToProps)(Cell);
