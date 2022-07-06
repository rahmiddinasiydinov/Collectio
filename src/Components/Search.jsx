import { Typeahead } from "react-bootstrap-typeahead";
import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import './Component.scss'
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
export default function Search() {
    const [items, setItems] = useState([]);
  const [selected, setSelected] = useState([]);
  const { t } = useTranslation();
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("item_all").then((res) => {
      setItems(res.data?.data);
    });
  }, []);
  useEffect(() => {
    if (selected.length) {
      const found = items.find(e => e?.title === selected[0]);
      console.log(found);
      navigate(`item/${found?._id}`)
    
   }
  }, [selected])
    const handleChange = e => {
        console.log(e.target.value);
    }
  return (
    <form className="search__form">
      <Typeahead
        id="basic-typeahead-single"
        labelKey="name"
        className="search__input"
        onChange={setSelected}
        options={items?.map((e) => e?.title)}
        placeholder={t("SearchItems")}
        selected={selected}
      
      />
    </form>
  );
}

