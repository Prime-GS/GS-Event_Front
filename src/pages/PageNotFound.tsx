

const PageNotFound: React.FC = () => {
  return (
    <Root>
      <BrokenImageOutlined sx={{ fontSize: '7rem', color: '#ccc', mb: 1 }} />
      <Typography variant='h5' textAlign='center' color='grey.400' gutterBottom>
        Страница не найдена
      </Typography>
    </Root>
  )
}

const Root = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: 'calc(100vh - 200px)',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: theme.spacing(3),
  marginRight: theme.spacing(3),
}))

export default PageNotFound
