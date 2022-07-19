import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const StyledErrorPage = styled.div`
  max-width: 50%;
  border: 5px solid red;
  background-color: pink;
`;

const ErrorPage = () => {
  return (
    <>
      <Helmet>
        <title>Pagina no encontrada 😢</title>
      </Helmet>
      <StyledErrorPage>
        <h1>Error</h1>
        <p>Página no encontrada</p>
        <p>
          Por favor dirijase a la <Link to="/">página principal</Link>
        </p>
      </StyledErrorPage>
    </>
  );
};

export default ErrorPage;
