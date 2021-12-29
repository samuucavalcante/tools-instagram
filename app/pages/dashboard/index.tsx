import { DashboardLayout } from '../../components/DashboardLayout';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';

export default function Dashboard() {

  return (
    <DashboardLayout id="1" title="Home">
      DashBoard
    </DashboardLayout>
  );
}
export const getServerSideProps: GetServerSideProps =  async (ctx) => {
  const { ['instagram-tools:token']: token } = parseCookies(ctx);

  if(!token) {
    return  {
      redirect: {
        destination: '/signin',
        permanent: false
      }
    }
  }
  return {
    props: {}
  }
}
