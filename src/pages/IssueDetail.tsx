import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Box, Typography, Grid, Tabs, Tab, AppBar } from '@material-ui/core';

import service from '../service';

import IssueDetailHeader from '../components/IssueDetail/IssueDetailHeader';
import { IIssue } from '../types';

interface MatchParams {
  id: string;
}
interface TabPanelProps {
  children: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function IssueDetail(): React.ReactElement {
  const [issue, setIssue] = useState<IIssue>();
  const [tabIndex, setTabIndex] = useState<number>(0);
  const match = useRouteMatch<MatchParams>('/issue/:id');
  const handleChangeTab = (event: React.ChangeEvent<any>, newValue: number) => {
    setTabIndex(newValue);
  };
  useEffect(() => {
    (async () => {
      const res = await service.getIssue(match?.params.id || '');
      setIssue(res.data);
      // setIssue(temp);
    })();
  }, [match?.params.id]);
  return (
    <Box flexGrow={1}>
      <Grid container>
        <Grid item xs={12}>
          {issue && <IssueDetailHeader issue={issue} />}
        </Grid>
        <Grid item xs={12}>
          <AppBar color="transparent" position="static">
            <Tabs indicatorColor="primary" value={tabIndex} onChange={handleChangeTab}>
              <Tab label="DETAILS" id="tab-0" />
              <Tab label="EVENTS" id="tab-1" />
              <Tab label="TAGS" id="tab-2" />
            </Tabs>
          </AppBar>
          <TabPanel value={tabIndex} index={0}>
            DETAILS
          </TabPanel>
          <TabPanel value={tabIndex} index={1}>
            EVENTS
          </TabPanel>
          <TabPanel value={tabIndex} index={2}>
            TAGS
          </TabPanel>
        </Grid>
      </Grid>
    </Box>
  );
}

export default IssueDetail;
