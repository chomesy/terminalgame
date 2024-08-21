"use client"

import { useState, useEffect } from 'react';
import AutoComplete from '@mui/material/Autocomplete';
import Input from '@mui/material/Input';

interface AutoCompleteBoxProps {
  options: readonly string[];
  inputString: string;
  setInputString: (input: string) => void;
}


export default function AutoCompleteBox (AutoCompleteBoxProps: AutoCompleteBoxProps) {
  const { options, inputString, setInputString } = AutoCompleteBoxProps;
  
  const [input, setInput] = useState<string[]>([]);

  useEffect(() => {
    if (inputString === '') setInput([]);
    else if (inputString === ' ') setInput([]);
    //else setInput(inputString.split(' '));
  }, [inputString]);

  useEffect(() => {
    console.log("Autocom UE. Options: ", options);
  }, [options]);

  const handleValueChange = (event: any, newValue: string[] | null) => {
    if (newValue) {
      setInput(newValue);
      let stringValue = '';
      for (let i = 0; i < newValue.length; i++) {
        stringValue += ` ` + newValue[i].normalize('NFD').replace(/[\u0080-\uffff]/g, '').trim();
      }
      setInputString(stringValue.trim());
    }
  };

  return (
    <AutoComplete
      id="main-autocomplete-input"
      multiple
      freeSolo
      value = {input}
      onChange = {handleValueChange}
      autoComplete
      autoHighlight
      includeInputInList={false}
      options = {options}
      ListboxProps={{ sx: {lineHeight: '8px', fontSize: '12px', fontFamily: 'monospace', backgroundColor: 'transparent', color: 'grey', margin: '0px', padding: '0px', } }}
      slotProps={{
        paper : {sx: {backgroundColor: 'black', color: 'grey', border: 'none', padding: '0px', zIndex: '9999'}},
      }}
      ChipProps={{variant: 'outlined', size: 'small', color: 'success', sx: {color: 'grey', borderRadius: '3px', fontFamily: 'monospace', fontSize: '14px', margin: '0px', padding: '0px',}}}
      renderInput={
          (params) => {
              const { InputLabelProps, InputProps, ...rest } = params;
              return <Input
              {...params.InputProps}
              {...rest}
              type="text"
              color="success"
              margin='none'
              size='small'
              value={input} 
              placeholder="- Type your command here -"
              style={{
                  border: 'none', 
                  backgroundColor: 'transparent', 
                  color: 'grey', 
                  fontFamily: 'monospace', 
                  fontSize: '14px',
                  margin: '0px',
                  padding: '0px',
                  }}
              slotProps={{
                input: {
                  sx: {'&::selection': {backgroundColor: 'grey', color: 'black'}},
                }
              }}
              />
          }
      }
      sx = {{ flexGrow: 1, backgroundColor: 'transparent', padding: '0px', margin: '0px', }}
  />
  )
}