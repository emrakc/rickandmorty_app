import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
 import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { gql, useQuery } from '@apollo/client';
import Paper from '@material-ui/core/Paper';

export const GET_FIRST_FIVE_LOCATIONS = gql` 
query($ids: [ID!]=[] ) {
    episodesByIds(ids: $ids) {
        id
        episode
        name 
        air_date
    }
  }
`; 

const EpisodesGrid = ({ list }) => {  
    const { data, error, loading } = useQuery(
        GET_FIRST_FIVE_LOCATIONS,
        {
            variables: { ids: list }
        }
    ) 
    if (loading) return (<p>Loading...</p>)
    if (error) return (<p>error :(</p>)
    return (
        <TableContainer component={Paper}>
            <Table aria-label="table">
                <TableHead>
                    <TableRow>
                        <TableCell align="right">Episode</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Air Data</TableCell> 
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.episodesByIds.map((row) => (
                        <TableRow role='data-row' key={row.id}> 
                            <TableCell align="right">{row.episode}</TableCell> 
                            <TableCell align="right">{row.name}</TableCell>
                            <TableCell align="right">{row.air_date}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default EpisodesGrid;