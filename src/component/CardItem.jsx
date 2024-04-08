import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { BiRupee } from "react-icons/bi";
import { Link } from "react-router-dom";

const CardItem = ({ product }) => {
  return (
    <Card
      sx={{
        maxWidth: 280,

        ":hover": {
          transform: "scale(1.2)",
          transition: "2s",
        },

        transition: "2s",
      }}
    >
      <Link to="/product" style={{ textDecoration: "none" }}>
        <CardMedia
          component="img"
          height="100px"
          image={product.image}
          alt={product.name}
          sx={{
            aspectRatio: "2/2",
            objectFit: "cover",
            objectPosition: "top",
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="subtitle1" component="div">
            {product.name}
          </Typography>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <BiRupee />
            <Typography variant="body2">{product.price}</Typography>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default CardItem;
