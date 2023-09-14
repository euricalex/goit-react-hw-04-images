import styled from 'styled-components'

export const SearchbarHeader = styled.header`
  top: 0;
  left: 0;

  position: sticky;
  z-index: 1100;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 64px;
  padding-right: 24px;
  padding-left: 24px;
  padding-top: 12px;
  padding-bottom: 12px;
  border-radius: 3px;
  
  background-color: blue;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
`;

export const SearchForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between; /* Изменим выравнивание */

width: 500px;
  background-color: #f9f9f9; /* Изменим цвет фона */
  border-radius: 5px; /* Изменим радиус скругления углов */
  border: 1px solid #ccc; /* Изменим цвет границы */
  padding: 5px; /* Добавим внутренний отступ */
`;


export const SearchFormButton = styled.button`
display: inline-block;
  width: 48px;
  height: 48px;
  border: 0;
  background-size: 40%;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  outline: none;
  
`;




export const SearchFormInput = styled.input`
display: inline-block;
  width: 100%;
  font: inherit;
  font-size: 20px;
  border: none;
  outline: none;
  padding-left: 4px;
  padding-right: 4px;
  
`;

export const ResetButton = styled.button`
margin-left: 20px;
padding: 8px 30px;
  border-radius: 5px;
  background-color: red;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  text-align: center;
  color: #fff;
  &:hover {
    background-color: darkred; /* Новый цвет фона при наведении */
    box-shadow: 0px 6px 3px -3px rgba(0, 0, 0, 0.2),
      0px 4px 4px 0px rgba(0, 0, 0, 0.14), 0px 3px 8px 0px rgba(0, 0, 0, 0.12); /* Новая тень при наведении */
  }
  border: 0;
  cursor: pointer;
  font-family: inherit;
  font-size: 18px;
  line-height: 24px;
  font-style: normal;
  font-weight: 500;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
`;
export const OnTopButton = styled.button`
position: absolute;
right: 20px;
padding: 8px 16px;
  border-radius: 2px;
  background-color: white;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  text-align: center;
  color: grey;
  border: 0;
  cursor: pointer;
  font-family: inherit;
  font-size: 18px;
  line-height: 24px;
  font-style: normal;
  font-weight: 500;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
`;