import { Card, CardContent, Skeleton, Grid } from "@mui/material";

export const MovieCardSkeleton = () => {
  return (
    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
      <Card>
        <Skeleton variant="rectangular" height={450} />
        <CardContent>
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          <Skeleton variant="text" width="60%" />
        </CardContent>
      </Card>
    </Grid>
  );
};
