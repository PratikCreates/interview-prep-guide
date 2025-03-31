import { List, ListItem, ListItemText, Link } from '@mui/material';

const ResourceList = ({ resources }) => {
  return (
    <List>
      {resources.map((resource, index) => (
        <ListItem key={index}>
          <ListItemText>
            <Link href={resource.url} target="_blank" rel="noopener">
              {resource.title}
            </Link>
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

export default ResourceList;