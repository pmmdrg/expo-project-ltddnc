import { Image, StyleSheet, Text, View } from 'react-native';
import { textColors } from '../assets/colors/colors';

const CommentItem = ({ comments }) => {
  return comments?.length !== 0 ? (
    comments?.map((comment) => {
      return (
        <View key={comment?._id} style={styles.commentContainer}>
          <Text style={styles.person}>{comment?.voteBy}</Text>
          <View style={styles.commentInfo}>
            <Text style={styles.comment}>{comment?.comment}</Text>
            <View style={styles.voteInfo}>
              <Text style={styles.vote}>{comment?.vote}</Text>
              <Image
                style={styles.voteIcon}
                source={require('../assets/icons/star.png')}
              />
            </View>
          </View>
        </View>
      );
    })
  ) : (
    <Text style={styles.noComment}>Chưa có bình luận nào ở đây</Text>
  );
};

const styles = StyleSheet.create({
  commentContainer: {
    padding: 15,
  },
  person: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  commentInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  comment: {
    marginTop: 5,
    fontSize: 16,
  },
  voteInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vote: {
    fontSize: 16,
  },
  voteIcon: {
    height: 20,
    width: 20,
  },
  noComment: {
    fontSize: 14,
    color: textColors.secondaryText,
    textAlign: 'center',
    paddingVertical: 20,
  },
});

export default CommentItem;
