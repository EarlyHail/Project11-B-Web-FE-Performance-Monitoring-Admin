import React, { useState, useEffect, useCallback } from 'react';

import Pagination from '@material-ui/lab/Pagination';
import { Box, Button, Paper } from '@material-ui/core';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { useSelector } from 'react-redux';
import TimerBtn from '../../common/TimerBtn';
import IssueToolbar from './IssueToolbar';
import IssueListItem from './IssueListItem';
import service from '../../../service';
import { IIssue } from '../../../types';
import { RootState } from '../../../modules';
import arrayToCSV from '../../../utils/arrayToCSV';
import useInterval from '../../../hooks/UseInterval';

function IssueTable(): React.ReactElement {
  const [issues, setIssues] = useState<IIssue[]>([]);
  const [page, setPage] = useState<number>(1);

  const [totalPage, setTotalPage] = useState<number>();
  const selectedProjectsIds = useSelector((state: RootState) => state.projects.selectedProjectsIds);
  const selectedPeriod = useSelector((state: RootState) => state.projects.selectedPeriod);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleDownload = (): void => {
    if (issues === undefined) {
      return;
    }

    const rows = [
      ['project Name', '_id', 'message', 'type', 'lastOccuredAt'],
      ...issues.map((row) => {
        return [
          row.project.name,
          row._id,
          row.message,
          row.type,
          new Date(row.occuredAt).toISOString(),
        ];
      }),
    ];
    arrayToCSV(rows);
  };

  const getData = useCallback(async () => {
    if (selectedProjectsIds[0] === undefined) return;

    const res = await service.getIssues(selectedProjectsIds, page, selectedPeriod);
    if (res.data.data === undefined) {
      setTotalPage(0);
      setIssues([]);
      return;
    }
    setTotalPage(res.data.metaData.totalPage);
    setIssues(res.data.data);
  }, [selectedProjectsIds, page, selectedPeriod]);
  useInterval(() => getData(), 10000);

  useEffect(() => {
    getData();
  }, [selectedProjectsIds, page, getData]);
  return (
    <Box my={1} display="flex" flexDirection="column">
      <Box flexGrow={1}>
        <Box my={1} display="flex" justifyContent="flex-end">
          <Box mr={1}>
            <Button variant="contained" onClick={handleDownload} color="primary" size="small">
              <CloudDownloadIcon />
            </Button>
          </Box>
          <Box>
            <TimerBtn action={getData} count={5} />
          </Box>
        </Box>
        <Paper elevation={1}>
          <Box
            display="flex"
            flexDirection="column"
            border="1px solid #cfcfcf"
            borderRadius=".2rem"
          >
            <IssueToolbar />
            {issues.map((issue) => (
              <IssueListItem key={issue._id} issue={issue} />
            ))}
            <Box display="flex" flexDirection="column" alignItems="center" p={1}>
              <Pagination count={totalPage} page={page} onChange={handlePageChange} />
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

export default React.memo(IssueTable);
