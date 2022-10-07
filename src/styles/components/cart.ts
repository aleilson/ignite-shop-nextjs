import { styled } from "..";

export const CartProductContainer = styled('div', {
  position: 'fixed',
  right: 0,
  top: 0,
  bottom: 0,
  height: '100vh',
  width: '480px',
  background: '$gray800',
  padding: '28px 48px',
  overflow: 'hidden',

  strong: {
    color: '$gray100',
    fontSize: '$lg',
  },

  '& > div': {
    height: '65%',
  },

  '& > button': {
    display: 'block',
    marginLeft: 'auto',
    background: 'transparent',
    color: '$gray500',
    border: 'none',
    cursor: 'pointer',
  },
});

export const CartProduct = styled('div', {
  display: 'flex',
  alignItems: 'flex-start',
  marginTop: '32px',

  
  '& + div': {
    marginTop: '1.5rem'
  },

  img: {
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    borderRadius: 8,
    objectFit: 'cover'
  },

  div: {
    margin: '0 0 0 20px',

    span: {
      display: 'block',
      fontSize: '$md',
      color: '$gray300',
      lineHeight: '1.75rem',
      width: '12.5rem',
    },

    strong: {
      fontSize: '$md',
      color: '$gray100',
      lineHeight: '1.75rem',
      
    },

    '& > button': {
      display: 'block',
      color: '$green500',
      lineHeight: '1.75rem',
      fontWeight: 'bold',
      background: 'transparent',
      border: 'none',
      marginLeft: 0,
      cursor: 'pointer',

      '&:hover': {
        opacity: '0.7'
      }
    }
  },
});

export const CartAmount = styled('div', {
  marginTop: 'auto',
  
  '& > div': {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',

    p: {
      color: '$gray100',
      lineHeight: '1.5625rem',
      marginBottom: 7,
    },

    strong: {
      color: '$gray100',
      lineHeight: '2.0625rem',
      fontSize: '$xl',
    },

    span: {
      color: '$gray100',
      lineHeight: '1.75rem',
      fontSize: '$md',
    },
  },

  button: {
    width: '100%',
    marginTop: '57px',
    backgroundColor: '$green500',
    border: 0,
    color: '$white',
    borderRadius: 8,
    padding: '1.25rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '$md',

    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },

    '&:not(:disabled):hover': {
      backgroundColor: '$green300'
    }
  }
});