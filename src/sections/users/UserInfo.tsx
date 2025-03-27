
import { IUser } from '../../graphql/types/users'

interface IProps {
  user: IUser
}

export function UserInfo({ user }: IProps) {
  return (
    <Box mb={3}>
      <ValueRowItem label='Имя' value={user.firstName} />
      <ValueRowItem label='Фамилия' value={user.lastName ?? '--'} />
      <ValueRowItem label='Отчество' value={user.middleName ?? '--'} />
      <ValueRowItem label='Почта' value={user.email} />
      <ValueRowItem label='Город' value={user.city?.title ?? '--'} />
    </Box>
  )
}

function ValueRowItem({ label, value }: { label: string; value: string }) {
  return (
    <Stack direction='row' spacing={3} alignItems='center'>
      <Typography color='text.secondary'>{label}</Typography>
      <Divider sx={{ flexGrow: 1 }} />
      <Typography variant='subtitle1'>{value}</Typography>
    </Stack>
  )
}
