import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Checkbox, Button, ButtonGroup, IconButton } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import 'billboard.js/dist/billboard.css';

import Chart from '../components/Chart';

function Issue(): React.ReactElement {
  const json = {
    issues: [
      { id: 1, occuredAt: '2020-11-23 01:36' },
      { id: 2, occuredAt: '2020-11-23 01:36' },
      { id: 3, occuredAt: '2020-11-23 01:39' },
      { id: 4, occuredAt: '2020-11-23 01:40' },
      { id: 5, occuredAt: '2020-11-23 01:45' },
      { id: 6, occuredAt: '2020-11-23 01:50' },
    ],
  };

  return (
    <Box p={5} display="flex" flexDirection="column" minHeight="100vh">
      <Box>
        <Chart chartData={json.issues} />
      </Box>
      <Box flexGrow={1}>
        <Box>
          <Box display="flex" justifyContent="space-between">
            <Box>
              <Box display="flex" gridGap={5}>
                <Box display="flex" alignItems="center">
                  <Checkbox checked={false} inputProps={{ 'aria-label': 'primary checkbox' }} />
                </Box>
                <Box display="flex" alignItems="center" fontSize="10px">
                  <Button variant="outlined">
                    <Box component="span" fontSize="0.625rem" fontWeight={900}>
                      Resolve
                    </Box>
                  </Button>
                </Box>
                <Box display="flex" alignItems="center">
                  <Button variant="outlined">
                    <Box component="span" fontSize="0.625rem" fontWeight={900}>
                      Ignore
                    </Box>
                  </Button>
                </Box>
                <Box display="flex" alignItems="center">
                  <Button variant="outlined">
                    <Box component="span" fontSize="0.625rem" fontWeight={900}>
                      Merge
                    </Box>
                  </Button>
                </Box>
                <Box display="flex" alignItems="center">
                  <IconButton>
                    <MoreHorizIcon />
                  </IconButton>
                </Box>
                <Box display="flex" alignItems="center">
                  <IconButton>
                    <PlayArrowIcon />
                  </IconButton>
                </Box>
              </Box>
            </Box>
            <Box display="flex" alignItems="center">
              <Box mr={5}>Graph:</Box>
              <Box>
                <ButtonGroup variant="text" color="primary">
                  <Button>24H</Button>
                  <Button>14D</Button>
                </ButtonGroup>
              </Box>
            </Box>
            <Box display="flex" alignItems="center">
              Events
            </Box>
            <Box display="flex" alignItems="center">
              Users
            </Box>
            <Box display="flex" alignItems="center">
              Assignee
            </Box>
          </Box>
          <Box display="flex" flexDirection="column">
            {json.issues.map((issue) => (
              <Link to={`/issue/${issue.id}`}>
                {issue.id} 발생 시간 : {issue.occuredAt}
              </Link>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
export default Issue;