import bathroom from '../../../../../assets/images/bathroom.jpg';
import mixer from '../../../../../assets/images/mixer.jpg';
import kerama from '../../../../../assets/images/kerama.jpg';
import sink from '../../../../../assets/images/sink.jpg';
import tile from '../../../../../assets/images/tile.jpg';
import toilets from '../../../../../assets/images/toilets.jpg';
import { Box, Paper, Typography } from '@mui/material';

const categories = [
  { title: 'Керамагранит', imageURL: kerama },
  { title: 'Кафель', imageURL: tile },
  { title: 'Смесители', imageURL: mixer },
  { title: 'Раковины', imageURL: sink },
  { title: 'Ванны', imageURL: bathroom },
  { title: 'Унитазы', imageURL: toilets },
];

const Catalog = () => {
  return (
    <Box display="flex" gap={2} flexWrap="wrap">
      {categories.map((category) => (
        <Paper key={category.title} elevation={3} sx={{ maxWidth: 200, flexGrow: 1 }}>
          <Box p={2}>
            <img
              src={category.imageURL}
              alt={category.title}
              style={{ width: '100%', height: 'auto', marginBottom: 10 }}
            />
            <Typography variant="h6" align="center">
              {category.title}
            </Typography>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default Catalog;
