import {useNavigate, useLocation} from "react-router-dom"

export default function SingleLocation() {
    const cat = "view";
    const location = useLocation();
    // const { data, loading, error, refetch } = useQuery(VIEWS_LOCATIONS,{
    //   fetchPolicy: 'network-only'
    // });
  
    // if (loading) return <span>...loading</span>;
    // if (error) {
    //   console.log(error);
    //   return `Error! ${error.message}`;
    // }
    return (
      <>
        <div>Single Location</div>
      </>
    );
  }
  