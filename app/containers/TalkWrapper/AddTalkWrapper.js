/**
 *
 * NewAgent
 *
 */

import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Collapse,
  Typography,
  TextField,
} from '@material-ui/core';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import { wrapperValidator } from 'utils/validators';

const StyledText = styled(TextField)`
  && {
    margin-top: 10px;
  }
`;

function AddTalkWrapper(props) {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    saving,
  } = props;
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Add Talk Group
          </Typography>
          <Typography component="p">
            Feel free to use any name you&#39;d like.
          </Typography>
          <StyledText
            id="name"
            type="text"
            label="Talk Group Name"
            error={touched.name && !!errors.name}
            value={values.name}
            onChange={handleChange}
            helperText={errors.name}
            onBlur={handleBlur}
            fullWidth
          />
          <Collapse in={!!values.name}>
            <StyledText
              id="avatar"
              type="text"
              label="Avatar"
              value={values.avatar}
              error={touched.avatar && !!errors.avatar}
              helperText={errors.avatar}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
            />
            <StyledText
              id="subtitle"
              type="text"
              label="Subtitle"
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              value={values.subtitle}
            />
            <StyledText
              id="description"
              type="text"
              label="Description"
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              value={values.description}
            />
          </Collapse>
        </CardContent>
        <CardActions>
          <Collapse in={!!values.name}>
            <Button type="submit" color="primary">
              {!saving && 'Submit'}
              {saving && <CircularProgress size={24} />}
            </Button>
          </Collapse>
        </CardActions>
      </form>
    </Card>
  );
}

const formikEnhancer = withFormik({
  validationSchema: wrapperValidator,

  mapPropsToValues: () => ({
    name: '',
    avatar: '',
    subtitle: '',
    description: '',
  }),
  handleSubmit: (payload, rest) => {
    rest.props.handleSubmit(payload, rest.resetForm);
  },
  displayName: 'TalkWrapper',
});

AddTalkWrapper.propTypes = {
  handleSubmit: PropTypes.func,
  values: PropTypes.object,
  touched: PropTypes.object,
  errors: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  saving: PropTypes.bool,
};

export default formikEnhancer(AddTalkWrapper);
