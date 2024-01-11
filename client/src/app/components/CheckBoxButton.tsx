import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useState } from "react";

type Props = {
  items: string[];
  checked?: string[];
  onChange: (items: string[]) => void;
};

const CheckBoxButton = ({ items, checked, onChange }: Props) => {
        const [checkedItems, setCheckItems] = useState(checked || []);

  function handleChecked (value: string) {
          const currentIndex = checkedItems.findIndex((item) => item === value);
          let newChecked: string[] = [];
          if (currentIndex === -1) newChecked = [...checkedItems, value];
          else newChecked = checkedItems.filter(item => item !== value);
          setCheckItems(newChecked);
          onChange(newChecked);
  }
  return (
    <FormGroup>
      {items.map((item) => (
              <FormControlLabel control={<Checkbox checked={checkedItems.indexOf(item) !== -1 } onClick={()=>handleChecked(item)} />} label={item} key={item} />
      ))}
    </FormGroup>
  );
};

export default CheckBoxButton;
