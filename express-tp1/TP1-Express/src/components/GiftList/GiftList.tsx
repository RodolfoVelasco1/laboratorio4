import { CardGift } from "../ui/CardGift/CardGift";
import { useAppSelector } from "../../hooks/redux";

export const GiftList = () => {

  const gift = useAppSelector((state)=> state.gift.gift);

  return (
    <div
    style={{
      display:"grid",
      gridTemplateColumns: "repeat(3, .6fr)",
      gap: "2vh",
    }}
    >
      {gift.map((el, i)=>(
        <CardGift gift={el} key={i} />
      ))}
    </div>
  );
};
