export function snapshotToData<T = unknown>(
  snapshot: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>
): T[] {
  return snapshot.docs.map((doc) => doc.data() as T);
}
