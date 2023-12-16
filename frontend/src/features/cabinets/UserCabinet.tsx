import React, { useEffect } from 'react';
import { Box, Card, CardContent, Grid, List } from '@mui/material';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import ListItemButton from '@mui/material/ListItemButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import MyInformation from './components/MyInformation';
import { CabinetState } from '../../types';
import { someStyle } from '../../styles';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getFavoriteProducts } from '../Products/productsThunks';
import { selectFavoriteProducts, selectFetchFavoriteProductsLoading } from '../Products/productsSlise';
import ProductCard from '../Products/components/ProductCard';
import Spinner from '../../components/UI/Spinner/Spinner';

const initialState: CabinetState = {
  orders: false,
  favorites: false,
  myInfo: true,
};

interface Props {
  exist?: CabinetState;
}

const UserCabinet: React.FC<Props> = ({ exist = initialState }) => {
  const dispatch = useAppDispatch();

  const [state, setState] = React.useState<CabinetState>(exist);
  const favoriteProducts = useAppSelector(selectFavoriteProducts);
  const favoriteProductsLoading = useAppSelector(selectFetchFavoriteProductsLoading);

  useEffect(() => {
    if (state.favorites) {
      dispatch(getFavoriteProducts());
    }
    // if (state.orders) {
    //   dispatch(getOrders());
    // }
  }, [dispatch, state.favorites, state.orders]);

  const handleClickOrders = () => {
    setState((prev) => ({ ...prev, orders: true, favorites: false, myInfo: false }));
  };

  const handleClickFavorites = () => {
    setState((prev) => ({ ...prev, orders: false, favorites: true, myInfo: false }));
  };

  const handleClickMyInfo = () => {
    setState((prev) => ({ ...prev, orders: false, favorites: false, myInfo: true }));
  };

  return (
    <Box mt={3}>
      <Card sx={{ minHeight: '600px' }}>
        <CardContent>
          <Grid container flexDirection="row" spacing={2} alignItems="self-start">
            <Grid item xs={12} sm={6} md={3}>
              <List
                sx={{
                  width: '100%',
                  maxWidth: 360,
                  boxShadow: someStyle.boxShadow,
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
              >
                <ListItemButton onClick={handleClickMyInfo}>
                  <ListItemIcon>
                    <HomeIcon style={state.myInfo ? { color: '#822020' } : {}} />
                  </ListItemIcon>
                  <ListItemText style={state.myInfo ? { color: '#822020' } : {}} primary={'myInfo'} />
                </ListItemButton>
                <ListItemButton onClick={handleClickOrders}>
                  <ListItemIcon>
                    <MapsHomeWorkIcon style={state.orders ? { color: '#822020' } : {}} />
                  </ListItemIcon>
                  <ListItemText style={state.orders ? { color: '#822020' } : {}} primary={'myOrders'} />
                </ListItemButton>
                <ListItemButton onClick={handleClickFavorites}>
                  <ListItemIcon>
                    <FavoriteIcon style={state.favorites ? { color: '#822020' } : {}} />
                  </ListItemIcon>
                  <ListItemText style={state.favorites ? { color: '#822020' } : {}} primary={'myFavorites'} />
                </ListItemButton>
              </List>
            </Grid>
            <Grid item xs>
              {state.myInfo && <MyInformation />}
              {/*{state.orders && <OrderItems ordersItems={orders} />}*/}
              {/*{loading && <Spinner />}*/}
              {favoriteProductsLoading && <Spinner />}
              {state.favorites && (
                <Grid container spacing={3}>
                  {favoriteProducts.map((product) => (
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} key={product._id}>
                      <ProductCard product={product} />
                    </Grid>
                  ))}
                </Grid>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserCabinet;
