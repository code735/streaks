import { Pressable, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  card: {
    borderRadius: 28,
    backgroundColor: "#1d1b16",
    paddingVertical: 20,
    paddingHorizontal: 22,
    gap: 14,
  },
  tag: {
    alignSelf: "flex-start",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(246, 241, 234, 0.35)",
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  tagText: {
    color: "#f6f1ea",
    fontSize: 10,
    letterSpacing: 3,
    textTransform: "uppercase",
    fontWeight: "600",
  },
  title: {
    color: "#f6f1ea",
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 26,
  },
  body: {
    color: "#d8cbbf",
    fontSize: 13,
    lineHeight: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  stat: {
    flex: 1,
    borderRadius: 18,
    backgroundColor: "rgba(246, 241, 234, 0.08)",
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  statLabel: {
    color: "#bbaea3",
    fontSize: 10,
    letterSpacing: 2,
    textTransform: "uppercase",
    fontWeight: "600",
  },
  statValue: {
    color: "#f6f1ea",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 6,
  },
  cta: {
    borderRadius: 999,
    backgroundColor: "#f6f1ea",
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
  },
  ctaText: {
    color: "#1d1b16",
    fontSize: 12,
    fontWeight: "600",
  },
});

export default function RNPreview() {
  return (
    <View style={styles.card}>
      <View style={styles.tag}>
        <Text style={styles.tagText}>React Native Web</Text>
      </View>
      <Text style={styles.title}>Shared UI works across web and mobile.</Text>
      <Text style={styles.body}>
        This card is rendered with react-native primitives inside Next.js.
      </Text>
      <View style={styles.row}>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Streak</Text>
          <Text style={styles.statValue}>24</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Focus</Text>
          <Text style={styles.statValue}>82%</Text>
        </View>
      </View>
      <Pressable style={styles.cta}>
        <Text style={styles.ctaText}>Open native preview</Text>
      </Pressable>
    </View>
  );
}
