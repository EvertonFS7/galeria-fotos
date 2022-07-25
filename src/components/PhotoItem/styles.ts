import styled from "styled-components";

export const Container = styled.div`
    background-color: #3d3f43;
    border-radius: 10px;
    padding: 10px;

    img {
       max-width: 100%;
       display: block;
       margin-bottom: 10px;
       border-radius: 10px;
    }

`
export const DeleteButton = styled.div`
    button {
      background-color: #e11616da;
      border: none;
      border-radius: 10px;
      color: #fff;
      cursor: pointer;
      font-weight: 600;
      padding: 10px;
      margin-top: 20px;
      width: 100%;

     &:hover {
      opacity: .8;
     }
  }
`