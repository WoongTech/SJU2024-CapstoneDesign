from pathlib import Path
from bs4 import BeautifulSoup
import pandas as pd

xmlstring = Path(r'Recipe.xml').read_text(encoding='utf-8')
# print(xmlstring)
xmlstring2 = Path(r'Recipe2.xml').read_text(encoding='utf-8')

row_list = []
soup = BeautifulSoup(xmlstring, "lxml")
for row in soup.find_all('row'):
    data = {tag.name: tag.text or tag.get('href') for tag in row.find_all()}
    row_list.append(data)

soup = BeautifulSoup(xmlstring2, "lxml")
for row in soup.find_all('row'):
    data = {tag.name: tag.text or tag.get('href') for tag in row.find_all()}
    row_list.append(data)

# Create a DataFrame
df = pd.DataFrame(row_list)
# Find columns where all values are NaN
columns_to_drop = df.columns[df.isna().all(axis=0)]
print(columns_to_drop)
# Drop these columns
df.drop(columns=columns_to_drop, inplace=True)

df.to_csv('./recipe.csv')