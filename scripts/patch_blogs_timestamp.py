import os

file_path = r"c:\PortoTree\src\app\own-subdomain\(protected)\blogs\page.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

old_code = """  const subDocs = await adminDb.collection('subscribers').get();
  const subscribers = subDocs.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as any[];"""

new_code = """  const subDocs = await adminDb.collection('subscribers').get();
  const subscribers = subDocs.docs.map(doc => {
    const data = doc.data();
    // Serialize Firestore Timestamps to ISO strings to pass to Client Component safely
    if (data.createdAt && typeof data.createdAt.toDate === 'function') {
      data.createdAt = data.createdAt.toDate().toISOString();
    }
    if (data.subscribedAt && typeof data.subscribedAt.toDate === 'function') {
      data.subscribedAt = data.subscribedAt.toDate().toISOString();
    }
    return {
      id: doc.id,
      ...data
    };
  }) as any[];"""

content = content.replace(old_code, new_code)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Patched successfully")
