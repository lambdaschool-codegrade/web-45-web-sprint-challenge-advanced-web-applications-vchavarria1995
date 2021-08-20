import React, { useEffect, useState } from "react";
import axiosWithAuth from "../helpers/axiosWithAuth"
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import { fetchColorService } from "../services/fetchColorService";

const BubblePage = () => {
  const [colors, setColors] = useState([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchColorService()
    .then(res => {
      //console.log(res);
      setColors(res.data)
    })
    .catch(err => {
      console.log(err);
    })
  }, [])
  //console.log(colors);

  const toggleEdit = (value) => {
    setEditing(value);
  };

  const saveEdit = (editColor) => {

    return colors.map(color => {
      if(color.id === editColor.id) {
        axiosWithAuth()
        .put(`/colors/${editColor.id}`, editColor)
        .then(res => {
          setColors(colors.map(color => {
            if(color.id === Number(res.data.id)){
              return res.data
            }else{
              return color
            }
          }))
          setEditing(true)
        })
        .catch(err => {
          console.log(err);
        })
      }else{
        return console.log(color);
      }
    })
  };

  const deleteColor = (colorToDelete) => {

    axiosWithAuth()
    .delete(`/colors/${colorToDelete.id}`)
    .then(res => {
      setColors(colors.filter(color => Number(color.id) != Number(res.data)))
    })
    .catch(err => {
      console.log(err);
    })
  };

  return (
    <div className="container">
      <ColorList colors={colors} editing={editing} toggleEdit={toggleEdit} saveEdit={saveEdit} deleteColor={deleteColor}/>
      <Bubbles colors={colors}/>
    </div>
  );
};

export default BubblePage;

//Task List:
//1. When the component mounts, make an axios call to retrieve all color data and push to state.
//2. Complete toggleEdit, saveEdit, deleteColor and functions
