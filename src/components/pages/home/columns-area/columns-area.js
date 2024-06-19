import Card from "./card/card";
import "./columns-area.css";

export default function ColumnsArea(props) {
  return (
    <div className="columns-area">
      {props.data.searchData.map((columnData, columnIndex) => (
        <div className="column" id={`column-${columnIndex}`} key={columnIndex}>
          {columnData.map((cardData, cardIndex) => (
            <Card
              id={`image-${columnIndex}-${cardIndex}`}
              key={`image-${columnIndex}-${cardIndex}`}
              status={props.data.status}
              image={cardData.image}
              tags={cardData.tags}
              author={cardData.user}
              onTagClick={(value) => {
                let searchTextField = document.querySelector(".search-text-field");
                searchTextField.value += (searchTextField.value.slice(-1) !== " " ? " " : "") + value;
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
